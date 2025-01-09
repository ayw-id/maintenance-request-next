describe('Update Maintenance Request', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'MaintenanceRequests') {
        req.reply({
          fixture: 'maintenanceRequests.json',
        });
      }
      if (req.body.operationName === 'UpdateRequest') {
        const updatedRequest = {
          id: req.body.variables.id,
          title: req.body.variables.title,
          description: req.body.variables.description,
          urgency: req.body.variables.urgency,
          status: req.body.variables.status,
          createdAt: "2023-12-01T13:10:13.000Z",
          updatedAt: new Date(), // Mock the update timestamp
        };
        req.reply({
          data: {
            updateRequest: updatedRequest,
          },
        });
      }
    });

    cy.visit('http://localhost:3000/');
  });

  it('should allow updating a maintenance request', () => {
    // Click on the first request in the list
    cy.contains('Broken window').click();

    // Verify the request details modal or page appears
    cy.contains('Maintenance Request').should('exist');

    // Update the request's details
    cy.get('input[placeholder="e.g: Bedroom window has cracked"]').clear().type('Updated Broken Window');
    cy.get('textarea[placeholder="e.g: Bedroom window has cracked"]').clear().type('Updated Description');
    cy.get('select').eq(0).select('LESS_URGENT');
    cy.get('select').eq(1).select('RESOLVED');

    // Save the changes
    cy.get('button').contains('Save').click();

    // Verify the updated request appears in the list
    cy.contains('Updated Broken Window').should('exist');
    cy.contains('Resolved').should('exist');
  });
});
