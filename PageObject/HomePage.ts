import {BasePage} from '../BasePage/BasePage';
import {ProductPageUI} from '../PageUI/ProductPageUI'
import {HomePageUI} from "../PageUI/HomePageUI";

export class HomePage extends BasePage {


    constructor(page: any) {
        super(page);
    }

    async clickProductButton() {
        await this.clickToElement(ProductPageUI.PRODUCT_BUTTON)
    }

    async isProductHeaderVisible() {
        await this.waitForElementVisible(ProductPageUI.PRODUCT_PAGE_TITLE)
        return await this.isElementDisplay(ProductPageUI.PRODUCT_PAGE_TITLE)
    }

    async scrollToDirectionButton() {
        await this.scrollToElement(ProductPageUI.DIRECTION_BUTTON)
    }

    async clickBuyCarInsurance() {
        await this.clickToElement(ProductPageUI.BUY_CAR_INSURANCE_BUTTON)
        await this.clickToElement(ProductPageUI.BUY_CAR_BUTTON)
    }



    async isHomePageTitleVisible() {
        return await this.isElementDisplay(HomePageUI.HOME_PAGE_TITLE) &&
            await this.isElementDisplay(HomePageUI.HOME_PAGE_TITLE_2) &&
            await this.isElementDisplay(HomePageUI.HOME_PAGE_DESCRIPTION)
    }

    async isPersonalInsuranceButtonVisible() {
        return await this.isElementDisplay(HomePageUI.PERSONAL_INSURANCE_BUTTON);
    }

    async isContactInformationVisible() {
        return await this.isElementDisplay(HomePageUI.CONTACT_US_TITLE)
        && await this.isElementDisplay(HomePageUI.PHONE_NUMBER)
        && await this.isElementDisplay(HomePageUI.EMAIL_US_BUTTON)
        && await this.isElementDisplay(ProductPageUI.DIRECTION_BUTTON)
    }
}
