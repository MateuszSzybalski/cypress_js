describe("Test", () => {
  it('Visits homepage, opens first article', () => {    
      cy.visit('https://www.goal.com/en')
      cy.intercept('*cnsnt.goal.com*', (id) => {
        id.destroy();
      })
      //cy.viewport(1536, 960)
      cy.title().should('eq', 'Football News, Live Scores, Results & Transfers | Goal.com')
      cy.get('[data-testid="article-card"]').eq(0).click()
  })
})