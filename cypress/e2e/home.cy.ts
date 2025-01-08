describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body.operationName === 'MaintenanceRequests') {
        req.reply({
          fixture: 'maintenanceRequests.json',
        });
      }
    });
    cy.visit('http://localhost:3000/');
  });

  it('should display metrics correctly', () => {
    cy.contains('Open Request').should('exist');
    cy.contains('Urgent Request').should('exist');
    cy.contains('Average time (days) to resolve').should('exist');
  });

  it('should display the maintenance requests list', () => {
    cy.contains('Broken window').should('exist');
    cy.contains('Leaky faucet').should('exist');
  });

  it('should open the form when the button is clicked', () => {
    cy.get('[data-test="add-item"]').click();
    cy.contains('Maintenance Request').should('exist');
  });
});
