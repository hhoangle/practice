import {BasePage} from '../BasePage/BasePage';
import {ProductPageUI} from '../PageUI/ProductPageUI'

export class HomePage extends BasePage {
    private policyStartDate: string;
    private policyEndDate: string;

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

    async inputVehicleRegistrationNumber(keyToSend: string) {
        await this.sendKeyToElement(ProductPageUI.VEHICLE_REGISTRATION_NUMBER, keyToSend)
    }

    async selectVehicleMake() {
        await this.clickToElement(ProductPageUI.VEHICLE_MAKE_DROP)
        await this.clickToElement(ProductPageUI.VEHICLE_MAKE_OPTION)
    }

    async selectFirstRegisteredIn() {
        await this.clickToElement(ProductPageUI.SELECT_YEAR_DROPDOWN)
        await this.clickToElement(ProductPageUI.SELECT_YEAR_OPTION)
    }

    async selectVehicleModel() {
        await this.clickToElement(ProductPageUI.VEHICLE_MODEL_DROPDOWN)
        await this.clickToElement(ProductPageUI.VEHICLE_MODEL_OPTION)
    }

    async selectPolicyStartDate() {
        const currentDate: Date = new Date();
        const increasedDate: Date = new Date(currentDate);
        increasedDate.setDate(increasedDate.getDate() + 1);

        const day: string = String(increasedDate.getDate()).padStart(2, '0');
        const month: string = String(increasedDate.getMonth() + 1).padStart(2, '0');
        const year: string = String(increasedDate.getFullYear());
        const policyStartDate: string = `${day}/${month}/${year}`;

        await this.sendKeyToElement(ProductPageUI.SELECT_POLICY_START_DATE, policyStartDate);
        await this.clickToElement(ProductPageUI.MARK_POINT);

        this.policyStartDate = policyStartDate;
    }

    async selectPolicyEndDate() {
        const currentDate: Date = new Date();
        const increasedDate: Date = new Date(currentDate);
        increasedDate.setMonth(increasedDate.getMonth() + 12);
        increasedDate.setDate(increasedDate.getDate() - 1);

        const day: string = String(increasedDate.getDate()).padStart(2, '0');
        const month: string = String(increasedDate.getMonth() + 1).padStart(2, '0');
        const year: string = String(increasedDate.getFullYear());
        const policyEndDate: string = `${day}/${month}/${year}`;

        await this.sendKeyToElement(ProductPageUI.SELECT_POLICY_END_DATE, policyEndDate);
        await this.clickToElement(ProductPageUI.MARK_POINT);

        this.policyEndDate = policyEndDate;
    }

    public getPolicyStartDate(): string {
        return this.policyStartDate;
    }

    public getPolicyEndDate(): string {
        return this.policyEndDate;
    }

    async selectDOB() {
        const currentDate: Date = new Date();
        const increasedDate: Date = new Date(currentDate);
        increasedDate.setDate(increasedDate.getDate() + 1);
        const finalDate: Date = new Date(increasedDate);
        finalDate.setFullYear(finalDate.getFullYear() - 25);

        const day: string = String(finalDate.getDate()).padStart(2, '0');
        const month: string = String(finalDate.getMonth() + 1).padStart(2, '0');
        const year: string = String(finalDate.getFullYear());
        const dateOfBirth: string = `${day}/${month}/${year}`;

        await this.sendKeyToElement(ProductPageUI.DATE_OF_BIRTH, dateOfBirth);
        await this.clickToElement(ProductPageUI.MARK_POINT);

    }

    async selectDrivingExperience(drivingExperience: string) {
        await this.clickToElement(ProductPageUI.DRIVING_EXPERIENCE);
        await this.sleepInSecond(1);
        await this.clickToElementDynamic(ProductPageUI.DRIVING_EXPERIENCE_OPTION, drivingExperience);
    }

    async selectNCD() {
        await this.clickToElement(ProductPageUI.NCD_DROPDOWN);
        await this.clickToElement(ProductPageUI.NCD_DROPDOWN_OPTION)
    }

    async selectNoOfClaim(noOfClaim: string) {
        await this.clickToElement(ProductPageUI.NO_OF_CLAIM_DROPDOWN);
        await this.clickToElementDynamic(ProductPageUI.NO_OF_CLAIM_DROPDOWN_OPTION, noOfClaim)
    }

    async inputEmail(email: string) {
        await this.sendKeyToElement(ProductPageUI.EMAIL_FIELD, email)
    }

    async inputMobileNo(mobileNo: string) {
        await this.sendKeyToElement(ProductPageUI.MOBILE_FIELD,mobileNo)
    }

    async clickCheckPrice() {
        await this.clickToElementDynamic(ProductPageUI.CHECK_PRICE_BUTTON)
    }

    async getPlansPageHeader() {
        await this.waitForElementVisible(ProductPageUI.PLANS_HEADER)
        return await this.isElementDisplay(ProductPageUI.PLANS_HEADER);
    }
}
