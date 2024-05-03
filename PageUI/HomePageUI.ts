export class HomePageUI{
    public static readonly HOME_PAGE_TITLE: string = "//span[text()='Homegrown Insurer']"
    static HOME_PAGE_TITLE_2: string = `//div[text()[normalize-space()='Protecting Singapore for over 45 Years']]`;
    static HOME_PAGE_DESCRIPTION: string = `//p[text()='As a Homegrown company, we take pride in our commitment to Singapore and its people for 45 years. We understand the local market and the unique risks associated with living and doing business in the country. We believe in building long-term relationships ']`;
    static PERSONAL_INSURANCE_BUTTON: string = `//div[@class='insurance-selected']//a[text()='Personal Insurance']`;
    static CONTACT_US_TITLE: string = `//h5[text()='CONTACT US']`;
    static PHONE_NUMBER: string = `//h4[text()='6206 5588']`;
    static EMAIL_US_BUTTON: string = `//h5[text()='Email Us']`;
}