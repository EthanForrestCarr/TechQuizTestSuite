import { mount } from 'cypress/react';
import Quiz from '../../client/components/Quiz';
import questions from '../../client/fixtures/questions.json';

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