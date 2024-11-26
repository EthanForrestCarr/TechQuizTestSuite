describe('Tech Quiz End-to-End Flow', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should start the quiz when the start button is clicked', () => {
      cy.get('[data-cy="start-button"]').click();
      cy.get('[data-cy="question-text"]').should('be.visible');
    });

    it('should proceed through all questions and end with a score', () => {
      cy.get('[data-cy="answer"]').each(($el) => {
        cy.wrap($el).click();
      });
      cy.wait(10000);
      cy.get('[data-cy="your-score"]').should('be.visible');
    });
  
    it('should allow the user to start a new quiz after finishing', () => {
      cy.wait(10000);
      cy.get('[data-cy="new-quiz-button"]').click();
      cy.get('[data-cy="question-text"]').should('be.visible');
    });
  });