describe('Maintenance Form', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'AddRequest') {
        req.reply({
          data: {
            addRequest: {
              id: 3,
              title: req.body.variables.title,
              description: req.body.variables.description,
              urgency: req.body.variables.urgency,
              status: req.body.variables.status,
              createdAt: new Date(),
            },
          },
        });
      }
    });
    cy.visit('http://localhost:3000/');
    cy.get('[data-test="add-item"]').click();
  });

  it('should allow creating a new request', () => {
    cy.get('input[placeholder="e.g: Bedroom window has cracked"]').type('Test Request');
    cy.get('textarea[placeholder="e.g: Bedroom window has cracked"]').type('Test Description');
    cy.get('select').eq(0).select('URGENT');
    cy.get('select').eq(1).select('OPEN');
    cy.get('button').contains('Save').click();

    // Confirm request creation
    cy.contains('Test Request').should('exist');
  });
});
