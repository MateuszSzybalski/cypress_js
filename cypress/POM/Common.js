/// <reference types="Cypress" />

export class Common {

    saveValue(selector, index, aliasName) {
      cy.get(selector).eq(index).then(value => {
        cy.wrap(value).invoke("text").as(aliasName);
      });
      cy.get("@" + aliasName).then(val => {
        console.log("Value:", val)
      });
      return this;
    };  

    compareAliasVal(selector, alias, index) {
      console.log(selector);
      cy.get("@" + alias).then((val) => {
        cy.wait(2000);
        cy.get(selector).eq(index).invoke("text").should("eq", val)
      });
      return this;
    };

    catchRequest(Mtehod, url, alias) {
      cy.intercept(Mtehod, url).as(alias)
    }

    waitForResponse = (aliasName, statusCode) => {
      cy.wait("@" + aliasName).its("response.statusCode").should("eq", statusCode)
      cy.wait(2000)
    }

    clickElement(selector) {
      cy.get(selector).click()
    }

    clickElementWithForce(selector) {
      cy.get(selector).click({force: true})
    }

    clickElementWithAttribute(selector, attribute, text) {
      cy.get(selector).should('have.attr', attribute, text).click()
    }

    clickElementContainsText(selector, text) {
      cy.get(selector).contains(text).click()
    }

    clickElementWithForceContainsText(selector, text) {
      cy.get(selector).contains(text).click({force: true})
    }

    //Assertions
    checkIfTableIsNotEmpty(numberOfElements) {
        cy.get('table').find('tr').should('have.length.at.least', numberOfElements)
    }

    checkIfElementIsVisible(selector) {
      cy.get(selector).should('be.visible')
    }

  }
  
  export const common = new Common();