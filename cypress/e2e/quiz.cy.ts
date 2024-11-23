describe('Tech Quiz End-to-End Flow', () => {
    before(() => {
      cy.visit('/');
    });
  
    it('should start the quiz when the start button is clicked', () => {
      cy.get('[data-cy=start-button]').click();
      cy.contains('Question 1').should('be.visible');
    });
  
    it('should proceed through all questions and end with a score', () => {
      cy.get('[data-cy=answer]').each(($el) => {
        cy.wrap($el).click();
      });
      cy.contains('Your Score:').should('be.visible');
    });
  
    it('should allow the user to start a new quiz after finishing', () => {
      cy.get('[data-cy=new-quiz-button]').click();
      cy.contains('Question 1').should('be.visible');
    });
  });