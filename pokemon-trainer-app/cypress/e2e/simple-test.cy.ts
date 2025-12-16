describe('Simple Test', function() {
  it('should visit the app', function() {
    cy.visit('/');
    cy.contains('Pokémon Trainer Login');
  });
});
