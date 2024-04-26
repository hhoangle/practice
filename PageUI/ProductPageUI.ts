export class ProductPageUI {
  public static readonly PRODUCT_BUTTON: string =
    "//a[text()='Buy Car Insurance']";
  public static readonly HOME_PAGE_TITLE: string =
    "//span[text()='Homegrown Insurer']";
  public static readonly PRODUCT_PAGE_TITLE: string = "//h2[text()='Products']";
  public static readonly DIRECTION_BUTTON: string = `//h5[text()='Directions']`;
  public static readonly BUY_CAR_INSURANCE_BUTTON: string = `//p[text()='Drive With Peace of Mind']`;
  public static readonly BUY_CAR_BUTTON: string = `//p[@class='mb-6 text-center']//following-sibling::div//a[text()='Buy']`;
  public static readonly VEHICLE_REGISTRATION_NUMBER: string = `//div[@class='car_plate_no el-input']//input`;
  public static readonly VEHICLE_MAKE_DROP: string = `//input[@placeholder='Select a Vehicle Make']`;
  public static readonly VEHICLE_MAKE_OPTION: string = `//li[contains(text(),'Popular Makes')]//parent::*//ul//li[1]`;
  public static readonly SELECT_YEAR_DROPDOWN: string = `//input[@placeholder='Select a year']`;
  public static readonly SELECT_YEAR_OPTION: string = `//span[text()='2023']//parent::*//preceding-sibling::*//span`;
  public static readonly VEHICLE_MODEL_DROPDOWN: string = `//input[@placeholder='Select a Vehicle Model']`;
  public static readonly VEHICLE_MODEL_OPTION: string = `//span[text()='A1 1.4']//parent::*//preceding-sibling::*//span`;
  public static readonly SELECT_POLICY_START_DATE: string = `//p[text()='Policy Start Date (inclusive)']//following-sibling::*//input[@placeholder='DD/MM/YYYY']`;
  public static readonly MARK_POINT: string = `//p[text()='Policy Start Date (inclusive)']`;
  public static readonly SELECT_POLICY_END_DATE: string = `//p[text()='Policy End Date (inclusive)']//following-sibling::*//input[@placeholder='DD/MM/YYYY']`;
  public static readonly DATE_OF_BIRTH: string = `//p[text()='Date of Birth']//following-sibling::*//input[@placeholder='DD/MM/YYYY']`;
  public static readonly DRIVING_EXPERIENCE: string = `//input[@placeholder=\"Select Driver's Experience (Years)\"]`;
  public static readonly DRIVING_EXPERIENCE_OPTION: string = `//span[text()='%s']`;
  public static readonly NCD_DROPDOWN: string = `//input[@placeholder='Select your current NCD']`;
  public static readonly NCD_DROPDOWN_OPTION: string = `//span[text()='0%']`;
  public static readonly NO_OF_CLAIM_DROPDOWN: string = `//input[@placeholder='Select number claim(s) within 3 years']`;
  public static readonly NO_OF_CLAIM_DROPDOWN_OPTION: string = `//span[text()='%s']`;
  public static readonly EMAIL_FIELD: string = `//p[text()='Email']//following-sibling::*//input`;
  public static readonly MOBILE_FIELD: string = `//p[text()='Mobile No.']//following-sibling::*//input`;
  public static readonly CHECK_PRICE_BUTTON: string = `//button//p[text()='Check Price']`;
  public static readonly PLANS_HEADER: string = `//h3[text()='Plans for you']`;
}
