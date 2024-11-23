import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
import questions from '../fixtures/questions.json';

declare global {
    namespace Cypress {
      interface Chainable {
        getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
      }
    }
  }

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/questions', { fixture: 'questions.json' });
  });

  it('should display the first question when mounted', () => {
    mount(<Quiz />);
    cy.contains(questions[0].question).should('be.visible');
  });

  it('should proceed to the next question when an answer is clicked', () => {
    mount(<Quiz />);
    cy.get('[data-cy=answer]').first().click();
    cy.contains(questions[1].question).should('be.visible');
  });

  it('should show the final score when all questions are answered', () => {
    mount(<Quiz />);
    questions.forEach(() => {
      cy.get('[data-cy=answer]').first().click();
    });
    cy.contains('Your Score:').should('be.visible');
  });
});