export class GetQuoteCarPageUI {
    public static VEHICLE_REGISTRATION_NUMBER: string = `//div[@class='car_plate_no el-input']//input`
    public static VEHICLE_MAKE_DROP: string = `//input[@placeholder='Select a Vehicle Make']`;
    public static VEHICLE_MAKE_OPTION: string = `//li[contains(text(),'Popular Makes')]//parent::*//ul//li[1]`;
    public static SELECT_YEAR_DROPDOWN: string = `//input[@placeholder='Select a year']`;
    public static SELECT_YEAR_OPTION: string = `//span[text()='2023']//parent::*//preceding-sibling::*//span`;
    public static VEHICLE_MODEL_DROPDOWN: string = `//input[@placeholder='Select a Vehicle Model']`;
    public static VEHICLE_MODEL_OPTION: string = `//span[text()='A1 1.4']//parent::*//preceding-sibling::*//span`;
    public static SELECT_POLICY_START_DATE: string = `//p[text()='Policy Start Date (inclusive)']//following-sibling::*//input[@placeholder='DD/MM/YYYY']`;
    public static MARK_POINT: string = `//p[text()='Policy Start Date (inclusive)']`;
    public static SELECT_POLICY_END_DATE: string = `//p[text()='Policy End Date (inclusive)']//following-sibling::*//input[@placeholder='DD/MM/YYYY']`;
    public static DATE_OF_BIRTH: string = `//p[text()='Date of Birth']//following-sibling::*//input[@placeholder='DD/MM/YYYY']`;
    public static DRIVING_EXPERIENCE: string = `//input[@placeholder=\"Select Driver's Experience (Years)\"]`;
    public static DRIVING_EXPERIENCE_OPTION: string = `//span[text()='%s']`;
    public static NCD_DROPDOWN: string = `//input[@placeholder='Select your current NCD']`;
    public static NCD_DROPDOWN_OPTION: string = `//span[text()='0%']`;
    public static NO_OF_CLAIM_DROPDOWN: string = `//input[@placeholder='Select number claim(s) within 3 years']`;
    public static NO_OF_CLAIM_DROPDOWN_OPTION: string = `//span[text()='%s']`;
    public static EMAIL_FIELD: string = `//p[text()='Email']//following-sibling::*//input`;
    public static MOBILE_FIELD: string = `//p[text()='Mobile No.']//following-sibling::*//input`;
    public static CHECK_PRICE_BUTTON: string = `//button//p[text()='Check Price']`;
    public static PLANS_HEADER: string = `//h3[text()='Plans for you']`;
    public static THIRD_PARTY_TITLE: string = `//div[@class='plans-container']//h4[@class='section-header text-center'][normalize-space()='Third Party Only']`;
    public static COMPREHENSIVE_TITLE: string = `//div[@class='plans-container']//h4[@class='section-header text-center'][normalize-space()='Comprehensive']`;
    public static THIRD_PARTY_FIRE_AND_THIEFT_TITLE: string = `//div[@class='plans-container']//h4[@class='section-header text-center'][normalize-space()='Third Party Only']`;
    public static SELECT_PLANS_BUTTON: string = `(//div[@class='orange-button-filled'][normalize-space()='Select'])[5]`;
    public static YES_CONTINUE_BUTTON: string = `//button[text()='Yes, Continue']`;
    public static ADD_ONS_TITLE: string = `//p[@class='text-title text-semi-bold mb-1']`;
}