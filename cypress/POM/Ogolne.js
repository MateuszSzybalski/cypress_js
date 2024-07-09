/// <reference types="Cypress" />

export class Ogolne {

        saveValue(selector, index, aliasName) {
        cy.get(selector).eq(index).then(value => {
          cy.wrap(value).invoke("text").as(aliasName);
        });
        cy.get("@" + aliasName).then(val => {
          console.log("Value:", val);
        });
        return this;
      };  
  
      compareAliasVal(selector, alias, index) {
        console.log(selector);
        cy.get("@" + alias).then((val) => {
          cy.wait(2000);
          cy.get(selector).eq(index).invoke("text").should("eq", val);
        });
        return this;
      };
    
  }
  
  export const ogolne = new Ogolne();