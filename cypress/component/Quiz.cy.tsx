import Quiz from '../../client/src/components/Quiz';
import questions from '../fixtures/questions.json';
import { mount } from 'cypress/react18';
import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

describe('Quiz Component', () => {
  beforeEach(() => {
    // Set up intercept before mounting the component
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('questions');
  });

  it('should display the first question when mounted', () => {
    // Mount the component
    mount(<Quiz />);
    // Wait for the API request to complete
    cy.wait('@questions');
    // Verify that the first question is displayed
    cy.contains(questions[0].question).should('be.visible');
  });

  it('should proceed to the next question when an answer is clicked', () => {
    // Mount the component
    mount(<Quiz />);
    // Wait for the API request to complete
    cy.wait('@questions');
    // Click on the first answer
    cy.get('[data-cy="answer"]').first().click();
    // Verify that the next question is displayed
    cy.contains(questions[1].question).should('be.visible');
  });

  it('should show the final score when all questions are answered', () => {
    // Mount the component
    mount(<Quiz />);
    // Wait for the API request to complete
    cy.wait('@questions');
    // Click through all questions
    questions.forEach(() => {
      cy.get('[data-cy="answer"]').first().click();
    });
    cy.contains('Quiz Complete').should('be.visible');
  });
});