/// <reference types="Cypress" />

import { Common } from "./Common"

export class StartPage extends Common{

    //selectors

    reportsAndSettingTab = '#grouptab-5'
    salesAndMarketingTab = '#grouptab-1'
    searchInput = '#filter_text'

    serachValue(selector, text) {
        cy.get(selector).type(text).type('{enter}')
    }
  }
  
  export const startPage = new StartPage();