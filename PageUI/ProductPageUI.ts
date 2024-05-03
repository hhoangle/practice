export class ProductPageUI {
    public static PRODUCT_BUTTON: string = `//span[text()='Products']`
    public static PRODUCT_PAGE_TITLE: string = "//h2[text()='Products']"
    public static DIRECTION_BUTTON: string = `//h5[text()='Directions']`
    public static BUY_CAR_INSURANCE_BUTTON: string = `//p[text()='Drive With Peace of Mind']`
    public static BUY_CAR_BUTTON: string = `//p[@class='mb-6 text-center']//following-sibling::div//a[text()='Buy']`
    public static BUY_CAR_BUTTON_IN_PRODUCT_DETAIL_PAGE: string = `//a[@class='blue-button-filled mb-1' and text()='Buy']`;
}