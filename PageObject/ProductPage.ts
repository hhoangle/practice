import {Page} from "@playwright/test";
import {BasePage} from "../BasePage/BasePage";
import {ProductPageUI} from "../PageUI/ProductPageUI";

export class ProductPage extends BasePage{
    constructor(page:any) {
        super(page)
    }

    async isProductPageVisible() {
        return await this.isElementDisplay(ProductPageUI.PRODUCT_PAGE_TITLE);
    }

    async clickBuyPrivateMotorCar() {
        await this.clickToElement(ProductPageUI.BUY_CAR_INSURANCE_BUTTON)
    }

    async clickBuy() {
        await this.clickToElement(ProductPageUI.BUY_CAR_BUTTON_IN_PRODUCT_DETAIL_PAGE);
    }
}