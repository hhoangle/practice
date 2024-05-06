import {ProductPageUI} from "../PageUI/ProductPageUI";
import {BasePage} from "../BasePage/BasePage";
import {GetQuoteCarPageUI} from "../PageUI/GetQuoteCarPageUI";

export class GetQuoteCarPage extends BasePage {
    constructor(page: any) {
        super(page)
    }

    private policyStartDate: string;
    private policyEndDate: string;

    async inputVehicleRegistrationNumber(keyToSend: string) {
        await this.sendKeyToElement(GetQuoteCarPageUI.VEHICLE_REGISTRATION_NUMBER, keyToSend)
    }

    async selectVehicleMake() {
        await this.clickToElement(GetQuoteCarPageUI.VEHICLE_MAKE_DROP)
        await this.clickToElement(GetQuoteCarPageUI.VEHICLE_MAKE_OPTION)
    }

    async selectFirstRegisteredIn() {
        await this.clickToElement(GetQuoteCarPageUI.SELECT_YEAR_DROPDOWN)
        await this.clickToElement(GetQuoteCarPageUI.SELECT_YEAR_OPTION)
    }

    async selectVehicleModel() {
        await this.clickToElement(GetQuoteCarPageUI.VEHICLE_MODEL_DROPDOWN)
        await this.clickToElement(GetQuoteCarPageUI.VEHICLE_MODEL_OPTION)
    }

    async selectPolicyStartDate() {
        const currentDate: Date = new Date();
        const increasedDate: Date = new Date(currentDate);
        increasedDate.setDate(increasedDate.getDate() + 1);

        const day: string = String(increasedDate.getDate()).padStart(2, '0');
        const month: string = String(increasedDate.getMonth() + 1).padStart(2, '0');
        const year: string = String(increasedDate.getFullYear());
        const policyStartDate: string = `${day}/${month}/${year}`;

        await this.sendKeyToElement(GetQuoteCarPageUI.SELECT_POLICY_START_DATE, policyStartDate);
        await this.clickToElement(GetQuoteCarPageUI.MARK_POINT);

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

        await this.sendKeyToElement(GetQuoteCarPageUI.SELECT_POLICY_END_DATE, policyEndDate);
        await this.clickToElement(GetQuoteCarPageUI.MARK_POINT);

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

        await this.sendKeyToElement(GetQuoteCarPageUI.DATE_OF_BIRTH, dateOfBirth);
        await this.clickToElement(GetQuoteCarPageUI.MARK_POINT);

    }

    async selectDrivingExperience(drivingExperience: string) {
        await this.clickToElement(GetQuoteCarPageUI.DRIVING_EXPERIENCE);
        await this.sleepInSecond(1);
        await this.clickToElementDynamic(GetQuoteCarPageUI.DRIVING_EXPERIENCE_OPTION, drivingExperience);
    }

    async selectNCD() {
        await this.clickToElement(GetQuoteCarPageUI.NCD_DROPDOWN);
        await this.clickToElement(GetQuoteCarPageUI.NCD_DROPDOWN_OPTION)
    }

    async selectNoOfClaim(noOfClaim: string) {
        await this.clickToElement(GetQuoteCarPageUI.NO_OF_CLAIM_DROPDOWN);
        await this.clickToElementDynamic(GetQuoteCarPageUI.NO_OF_CLAIM_DROPDOWN_OPTION, noOfClaim)
    }

    async inputEmail(email: string) {
        await this.sendKeyToElement(GetQuoteCarPageUI.EMAIL_FIELD, email)
    }

    async inputMobileNo(mobileNo: string) {
        await this.sendKeyToElement(GetQuoteCarPageUI.MOBILE_FIELD, mobileNo)
    }

    async clickCheckPrice() {
        await this.clickToElementDynamic(GetQuoteCarPageUI.CHECK_PRICE_BUTTON)
    }

    async getPlansPageHeader() {
        await this.waitForElementVisible(GetQuoteCarPageUI.PLANS_HEADER)
        return await this.isElementDisplay(GetQuoteCarPageUI.PLANS_HEADER);
    }

    isPlansDisabled() {
        return this.isElementDisplay(GetQuoteCarPageUI.PLANS_HEADER)
            && this.isElementDisplay(GetQuoteCarPageUI.THIRD_PARTY_TITLE)
            && this.isElementDisplay(GetQuoteCarPageUI.COMPREHENSIVE_TITLE)
            && this.isElementDisplay(GetQuoteCarPageUI.THIRD_PARTY_FIRE_AND_THIEFT_TITLE)
    }

    async selectComprehensive() {
        await this.clickToElement(GetQuoteCarPageUI.SELECT_PLANS_BUTTON)
    }

    async clickYesContinueButton() {
        await this.clickToElement(GetQuoteCarPageUI.YES_CONTINUE_BUTTON)
    }

    async getText() {
        console.log("get text is running")
        const elementsText = await this.getElementText("//p[@class='text-title text-semi-bold mb-1']");
        console.log("Elements Text:", elementsText);

        return elementsText;
    }
}