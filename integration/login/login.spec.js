import { Given, Then } from "cypress-cucumber-preprocessor/steps"

Given('que estoy en la página de iniciar sesión', function () {
  cy.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents errors
    return false
  })
  cy.visit("/user/old_login")
});

Given('escribo mi usuario y mi contraseña en el formulario', function () {

  cy.fixture('usuario.json').as('usuario')
  cy.get('@usuario').then((account) => {
    cy.get('#edit-name')
      .should('not.have.class', 'disabled')
      .type(account.user, { force: true })
  })
  cy.get('@usuario').then((account) => {
    cy.get('#edit-pass')
      .should('not.have.class', 'disabled')
      .type(account.password, { force: true })
  })
});

Given('pulson el boton {string}', function (string) {
  cy.get('#edit-submit').click();
  cy.wait(5000)
});

Then('me lleva a la página de mi cuenta de usuario', function () {
  cy.url().should('contain', '/user');
});

Then('puedo ver el titulo con mi nombre de usuario', function () {
  cy.get('.user__full-name > .field__item').should('exist')
  cy.screenshot('incio-de-sesion');
});

