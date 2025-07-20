import { functionsIn } from "cypress/types/lodash"

function loginPrev() {
  cy.viewport(600, 1024)
  cy.visit('/')
}

function Login() {
  loginPrev()
  cy.get('#usuario').click().type('{selectall}admin')
  cy.get('#clave').click().type('Admin123@')
  cy.contains('ion-button', 'Ingresar').click()
  cy.url({ timeout: 10000 }).should('match', /\/home$/);
}

function Perfil() {
    loginPrev()
    Login();
    cy.url().should('include', '/home');
    cy.contains('ion-button', 'Perfil').click();
    cy.url().should('include', '/profile');
    cy.contains('h1', 'Perfil').should('exist');
}


describe('Spec prueba', () => {  
  it('ingresa', () => {
    loginPrev()
  })

  describe('login', () => {
    it('Ingresa correctamente', () => {
      Login()
    })
        it('No ingresa', () => {
      loginPrev()
      cy.get('#usuario').click().type('{selectall}aaa')
      cy.get('#clave').click().type('xxxx')
      cy.contains('ion-button', 'Ingresar').click()
      cy.get('#iniciar').click({ force: true });
      cy.get('ion-alert .alert-message').should('contain.text', 'Usuario o contraseña incorrecta.');
       cy.url({ timeout: 10000 }).get('ion-alert').should('not.exist');


    })
  })
   
  describe('home', () => {
     it('Realizar login y llegar a home', () => {
        Perfil()
  });

   it('Modificar usuario', () => {
      loginPrev()
      Perfil()
      cy.contains('ion-button', 'Modificar').click();
      cy.get('#nombre').click().type('{selectall}Administrador 123')
        cy.contains('ion-button', 'Guardar Cambios').click()
    })
 

})
})