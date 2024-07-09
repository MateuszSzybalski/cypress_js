/// <reference types="cypress" />

import { common } from "../POM/Common"
import { loginPage } from "../POM/LoginPage"
import { projectManagementPage } from "../POM/ProjectManagementPage"
import { reportsAndSettingPage } from "../POM/ReportsAndSettingsPage"
import { salesAndMarketingPage } from "../POM/SalesAndMarketingPage"
import { startPage } from "../POM/StartPage"

describe('Replay', () => {
  Cypress.on('uncaught:exception', () => { return false })

beforeEach(() => {
      cy.visit('https://demo.1crmcloud.com')
    })
  
    it('Scenario 1 – Create contact:', () => {
        loginPage.logIntoPortal()
        loginPage.catchRequest('POST','**/json.php?action=get_menu_structure', 'request1')
        loginPage.clickElement(loginPage.loginButton)
        startPage.waitForResponse('request1', 200)
        startPage.clickElement(startPage.salesAndMarketingTab)
        salesAndMarketingPage.catchRequest('GET', '**?module=Contacts&action=EditView&return_module*', 'request1')
        salesAndMarketingPage.clickElementContainsText(salesAndMarketingPage.sideBar, 'Create Contact')
        salesAndMarketingPage.waitForResponse('request1', 200)       
        salesAndMarketingPage.fillTheFormFixture()
        // \/ can be used when we want to enter the fields ourselves \/
        //salesAndMarketingPage.fillTheFormByText('Tester1', 'Test', 'Customers', 'Suppliers', 'CEO')
        salesAndMarketingPage.catchRequest('GET', '**/async.php?module=Contacts&action=ShowDuplicates&key*', 'request2')
        salesAndMarketingPage.clickElement(salesAndMarketingPage.saveButton)
        salesAndMarketingPage.waitForResponse('request2', 200)
        salesAndMarketingPage.saveValue('.listViewNameLink', 0, 'nameAlias')
        salesAndMarketingPage.clickElementWithForceContainsText(salesAndMarketingPage.sideBarLabel, 'Contacts')
        salesAndMarketingPage.catchRequest('POST', '**//async*', 'request3')
        salesAndMarketingPage.filterByText('Tester1 Test')
        salesAndMarketingPage.filterByFirstNameAndLastNameFromFixture()
        salesAndMarketingPage.waitForResponse('request3', 200)
        salesAndMarketingPage.compareAliasVal('.listViewNameLink', 'nameAlias', 0)
        salesAndMarketingPage.catchRequest('GET', '**module=Contacts&action=DetailView&record*', 'requestContact')
        salesAndMarketingPage.clickElementWithValuesFromFixture()
        // \/ can be used when we want to enter the fields ourselves \/
        //salesAndMarketingPage.clickElementContainsText(salesAndMarketingPage.listViewNameLink, 'Tester1 Test')
        salesAndMarketingPage.waitForResponse('requestContact', 200)
        salesAndMarketingPage.clickElement(salesAndMarketingPage.detailFormPersonalData)
        salesAndMarketingPage.checkIfNamesAndTitleAreCorrect()
      })

      it('Scenario 2 – Run report:', () => {
        loginPage.logIntoPortal()
        loginPage.catchRequest('POST','**/json.php?action=get_menu_structure', 'request1')
        loginPage.clickElement(loginPage.loginButton)
        startPage.waitForResponse('request1', 200)
        startPage.clickElement(startPage.reportsAndSettingTab)
        //startPage.clickElementWithAttribute(startPage.reportsAndSettingTab, 'title', 'Reports & Settings')
        startPage.serachValue(startPage.searchInput, 'Project Profitability')    
        startPage.catchRequest('GET', '**/include/javascript/dnduploads.js', 'request2')
        reportsAndSettingPage.clickElementContainsText(reportsAndSettingPage.detailLink, 'Project Profitability')
        reportsAndSettingPage.waitForResponse('request2', 200)
        projectManagementPage.catchRequest('POST', '**/async.php', 'request3')
        projectManagementPage.clickElementWithForce(projectManagementPage.filterFormButton)
        projectManagementPage.waitForResponse('request3', 200)
        projectManagementPage.checkIfTableIsNotEmpty(2)
      })
    })