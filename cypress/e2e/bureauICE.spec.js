import { startPage } from "../POM/bureauICE/StartPage"
import { nt2 } from "../POM/bureauICE/NT2"
import { directContact } from "../POM/bureauICE/DirectContact"

describe("Start page", () => {

    beforeEach('open start page', () => {
      startPage.openToStartPage()
    })

    afterEach(() => { 
      cy.clearAllSessionStorage()
    });

    it('checkIfPageWorksCorrectly', () => {
      startPage.checkIfTitlePageIsCorrect('Bureau ICE - Eerlijk Inzicht geven in ieders kennis en talent')
      startPage.checkIfLogoIsDisplayed()
      startPage.checkIfLoginIconIsDisplayed()
      startPage.checkCountOfTiles('4')
      startPage.checkIfTileContainsCorrectElements()
      startPage.selectTileIfIsAvailable('NT2')
      //startPage.selectTile('NT2')
      nt2.checkUrlPath()
      nt2.checkIfTitlePageIsCorrect('NT2 - Bureau ICE')
      nt2.checkIfLogoIsDisplayed()
      nt2.checkIfDirectContactButtonIsDisplayed()
      nt2.clickDirectContactButton()
      directContact.checkUrlPath()
      directContact.checkIfTitlePageIsCorrect('Contact NT2 - Bureau ICE')
      directContact.checkIfLogoIsDisplayed()
      directContact.checkIfFormWrapperIsDisplayed()
      //directContact.fillTheForm1()
      directContact.fillTheForm2()
    })
    
})