// BasePage.ts
import {Cookie, Page, Browser, BrowserContext, Dialog, Frame, Locator} from '@playwright/test';
import {BasePageUI} from './BasePageUI';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
        console.log(page, 'page');
    }

    async clickToElement(locator: string) {
        const element = await this.page.locator(locator);
        await element.click();
    }

    async openPageUrl(pageUrl: string) {
        await this.page.goto(pageUrl);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }

    async getPageSourceCode(): Promise<string> {
        return await this.page.content();
    }

    async backToPage() {
        await this.page.goBack();
    }

    async forwardToPage() {
        await this.page.goForward();
    }

    async refreshCurrentPage() {
        await this.page.reload();
    }

    async getAllCookies(): Promise<Cookie[]> {
        const cookies = await this.page.context().cookies();
        return cookies;
    }

    async setCookies(cookies: Cookie[]) {
        await this.page.context().addCookies(cookies);
    }

    async waitForAlertPresence() {
        const dialog = await this.page.waitForEvent('dialog');
        return dialog;
    }

    async acceptAlert() {
        const dialog = await this.waitForAlertPresence();
        await dialog.accept();
    }

    async cancelAlert() {
        const dialog = await this.waitForAlertPresence();
        await dialog.dismiss();
    }

    async getTextAlert(): Promise<string> {
        const dialog = await this.waitForAlertPresence();
        return dialog.message();
    }

    async sendKeyToAlert(textValue: string) {
        const dialog = await this.waitForAlertPresence();
        await dialog.accept((textValue))
    }

    async switchToWindowByID(windowID: string) {
        const allWindowHandles = await this.page.context().pages();
        for (const handle of allWindowHandles) {
            if (handle !== this.page) {
                await handle.bringToFront();
                break;
            }
        }
    }

    async switchToWindowByPageTitle(expectedPageTitle: string) {
        const allWindowHandles = await this.page.context().pages();
        for (const handle of allWindowHandles) {
            await handle.bringToFront();
            const actualPageTitle = await handle.title();
            if (actualPageTitle.trim() === expectedPageTitle) {
                break;
            }
        }
    }

    async closeAllWindowWithoutParent(parentID: string) {
        const allWindowHandles = await this.page.context().pages();
        for (const handle of allWindowHandles) {
            if (handle !== this.page) {
                await handle.close();
            }
        }
        await this.page.bringToFront();
    }

    private getDynamicXpath(locator: string, ...dynamicValues: string[]) {
        return locator.replace('%s', dynamicValues.join(','));
    }

    private async getWebElement(locatorType: string) {
        return this.page.waitForSelector(locatorType);
    }

    async getListWebElement(locator: string) {
        return this.page.$$(locator);
    }

    async clickAndHold(locatorType: string) {
        const element = await this.getWebElement(locatorType);
        await element.click({button: 'left', modifiers: ['Shift']});
    }

    async dragAndDrop(locatorFrom: string, locatorTo: string) {
        await this.page.locator(locatorFrom).dragTo(await this.page.locator(locatorTo));
    }

    async sendKeyToElement(locatorType: string, textValue: string, ...dynamicValues: string[]) {
        const locator = this.getDynamicXpath(locatorType, ...dynamicValues);
        const element = await this.getWebElement(locator);
        await element.fill(textValue);
    }

    async clearValueInElementByDeleteKey(locatorType: string) {
        const element = await this.getWebElement(locatorType);
        await element.selectText();
        await this.page.keyboard.press('Delete');
    }

    async getElementText(selector: string): Promise<string> {
        await this.page.waitForSelector(selector);
        const element = await this.page.$(selector);
        return element ? await element.innerText() : '';
    }

    async getElementsTextByXPath(xpath: string): Promise<string[]> {
        const elements = await this.page.$$(xpath);
        const textList: string[] = [];

        for (const element of elements) {
            const text = await element.innerText();
            textList.push(text);
        }

        return textList;
    }

    async selectItemInDefaultDropdown(locatorType: string, textItem: string, ...dynamicValues: string[]) {
        const select = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues)).selectOption({label: textItem});
    }

    async getSelectedItemDefaultDropdown(locatorType: string, ...dynamicValues: string[]): Promise<string> {
        const dropdown = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues));
        const selectedItemText = await dropdown.evaluate((select) => {
            const selectedOption = select.querySelector('option:checked');
            return selectedOption?.textContent || '';
        });

        return selectedItemText.toString();
    }


    async isDropDownMultiple(locatorType: string, ...dynamicValues: string[]): Promise<boolean> {
        const dropdown = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues));
        const isMultiple = await dropdown.evaluate((select) => select.hasAttribute('multiple'));

        return isMultiple;
    }


    async selectItemInCustomDropdown(parentLocator: string, childLocator: string) {
        await this.page.locator(parentLocator).click();
        await this.page.waitForSelector(childLocator); // Ensure child elements are loaded
        const childItem = await this.page.locator(childLocator).first();
        await childItem.click();
    }

    async getElementAttribute(locatorType: string, attributeName: string, ...dynamicValues: string[]): Promise<string | null> {
        return await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues)).getAttribute(attributeName);
    }

    async getCssValue(locator: string, propertyName: string): Promise<string> {
        const cssValueHandle = await this.page.locator(locator).evaluateHandle((element, propertyName) => {
            return getComputedStyle(element).getPropertyValue(propertyName);
        }, propertyName);

        const cssValue = await cssValueHandle.jsonValue() as string;
        await cssValueHandle.dispose();

        return cssValue;
    }


    async getHexaColorFromRGBA(rgbaValue: string): Promise<string> {
        const hexColor = await this.page.evaluate((rgbaValue) => {
            const [r, g, b] = rgbaValue.match(/\d+/g).map(Number);
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }, rgbaValue);
        return hexColor;
    }


    async getElementsSize(locatorType: string, ...dynamicValues: string[]): Promise<number> {
        const selector = this.getDynamicXpath(locatorType, ...dynamicValues);
        const elements = await this.page.$$(`xpath=${selector}`);
        return elements.length;
    }


    async checkToDefaultCheckBoxOrRadio(locatorType: string, ...dynamicValues: string[]) {
        const element = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues));
        if (!(await element.isChecked())) {
            await element.click();
        }
    }

    async uncheckToDefaultCheckBox(locatorType: string, ...dynamicValues: string[]) {
        const element = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues));
        if (await element.isChecked()) {
            await element.click();
        }
    }

    async isElementDisplay(locatorType: string, ...dynamicValues: string[]): Promise<boolean> {
        const element = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues));
        console.log(element, 'element')
        return await element.isVisible();
    }

    async isElementUndisplayed(locatorType: string, ...dynamicValues: string[]): Promise<boolean> {
        const timeout = 1000; // Timeout in milliseconds
        try {
            await this.page.waitForSelector(this.getDynamicXpath(locatorType, ...dynamicValues), {
                state: 'hidden',
                timeout
            });
            return true; // Element is undisplayed
        } catch (error) {
            return false; // Element is displayed or not found within the timeout
        }
    }

    overrideImplicitTimeout(timeOut: number) {
        this.page.setDefaultTimeout(timeOut);
    }

    async isElementEnable(locatorType: string): Promise<boolean> {
        const element = await this.page.locator(locatorType);
        return await element.isEnabled();
    }

    async isElementSelected(locatorType: string, ...dynamicValues: string[]): Promise<boolean> {
        const element = await this.page.locator(this.getDynamicXpath(locatorType, ...dynamicValues));
        const isSelected = await element.isChecked();
        return isSelected;
    }

    async switchToFrame(page: Page, frameSelector: string): Promise<Frame | null> {
        const frameElement = await page.waitForSelector(frameSelector);

        if (frameElement) {
            const frame = await frameElement.contentFrame();
            if (frame) {
                return frame;
            } else {
                console.error('Could not switch to frame. Content frame not found.');
                return null;
            }
        } else {
            console.error('Could not switch to frame. Frame element not found.');
            return null;
        }
    }

    async switchToDefaultContent() {
        await this.page.mainFrame();
    }

    async hoverMouseToElement(locatorType: string) {
        const element = await this.page.locator(locatorType);
        await element.hover();
    }

    async pressKeyToElement(locator: string, key: string) {
        await this.page.locator(locator).press(key);
    }

    async scrollToBottomPage() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scrollToTopPage() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async highlightElement(locator: string) {
        const element = await this.page.locator(locator);
        const originalStyle = await element.evaluate(el => el.getAttribute('style'));
        await element.evaluate(el => {
            el.setAttribute('style', 'border: 2px solid red; border-style: dashed;');
        });
        await this.page.waitForTimeout(1000); // sleepInSecond(1)
        await element.evaluate((el, style) => {
            el.setAttribute('style', style);
        }, originalStyle);
    }

    async clickToElementByJS(locator: string) {
        await this.page.evaluate((locator) => {
            const element = document.querySelector(locator) as HTMLElement;
            if (element) {
                element.click();
            }
        }, locator);
    }


    async scrollToElement(xpathExpression: string): Promise<void> {
        await this.page.evaluate((xpath) => {
            const el = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
            if (el) {
                el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
            }
        }, xpathExpression);
    }


    async removeAttributeInDOM(locator: string, attributeRemove: string) {
        await this.page.evaluate(({locator, attributeRemove}) => {
            const element = document.querySelector(locator);
            if (element) {
                element.removeAttribute(attributeRemove);
            }
        }, {locator, attributeRemove});
    }

    async getTextByJs(locatorType: string): Promise<string> {
        return await this.page.$eval(locatorType, (element) => {
            return element.textContent;
        });
    }

    async areJQueryAndJSLoadedSuccess() {
        const jQueryLoaded = await this.page.evaluate(() => {
            return (window as any).jQuery ? (window as any).jQuery.active === 0 : true;
        });
        const jsLoaded = await this.page.evaluate(() => {
            return document.readyState === 'complete';
        });
        return jQueryLoaded && jsLoaded;
    }

    async isImageLoaded(locatorType: string): Promise<boolean> {
        return await this.page.evaluate((locator) => {
            const element = document.querySelector(locator) as HTMLImageElement;
            return element.complete && typeof element.naturalWidth !== "undefined" && element.naturalWidth > 0;
        }, locatorType);
    }

    async uploadImage(locator: string, imagePath: string) {
        const elementHandle = await this.page.locator(locator);
        await elementHandle.setInputFiles(imagePath);
    }

    async waitForElementVisible(locatorType: string) {
        await this.page.waitForSelector(locatorType, {state: 'visible'});
    }

    async waitForElementInvisible(locatorType: string) {
        await this.page.waitForSelector(locatorType, {state: 'hidden'});
    }

    async waitForElementUndisplayed(locatorType: string) {
        await this.page.waitForSelector(locatorType, {state: 'hidden'});
    }

    async waitForAllElementInvisible(locator: string) {
        await this.page.waitForSelector(locator, {state: 'hidden'});
    }

    async waitForElementClickable(locatorType: string) {
        await this.page.waitForSelector(locatorType, {state: 'visible'});
    }

    async inputToTextboxByID(textboxID: string, value: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_TEXTBOX_BY_ID + textboxID);
        await this.sendKeyToElement(BasePageUI.DYNAMIC_TEXTBOX_BY_ID + textboxID, value);
    }

    async clickToButtonByText(buttonText: string) {
        await this.waitForElementClickable(BasePageUI.DYNAMIC_BUTTON_BY_TEXT + buttonText);
        await this.clickToElement(BasePageUI.DYNAMIC_BUTTON_BY_TEXT + buttonText);
    }

    async clickToInputByPlaceholder(inputText: string) {
        await this.waitForElementClickable(BasePageUI.DYNAMIC_INPUT_BY_PLACEHOLDER + inputText);
        await this.clickToElement(BasePageUI.DYNAMIC_INPUT_BY_PLACEHOLDER + inputText);
    }

    async inputByPlaceholder(inputText: string, value: string) {
        await this.waitForElementClickable(BasePageUI.DYNAMIC_INPUT_BY_PLACEHOLDER + inputText);
        await this.sendKeyToElement(BasePageUI.DYNAMIC_INPUT_BY_PLACEHOLDER + inputText, value);
    }

    async inputDynamic(inputText: string, value: string) {
        await this.waitForElementClickable(BasePageUI.DYNAMIC_INPUT + inputText);
        await this.sendKeyToElement(BasePageUI.DYNAMIC_INPUT + inputText, value);
    }

    async getErrorInputByPlaceholder(errorTextInput: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_ERROR_INPUT_BY_PLACEHOLDER + errorTextInput);
        return await this.getElementText(BasePageUI.DYNAMIC_ERROR_INPUT_BY_PLACEHOLDER + errorTextInput);
    }

    async selectToDropdownByName(dropDownAttributeName: string, itemValue: string) {
        await this.waitForElementClickable(BasePageUI.DYNAMIC_DROPDOWN_BY_NAME + dropDownAttributeName);
        await this.selectItemInDefaultDropdown(BasePageUI.DYNAMIC_DROPDOWN_BY_NAME + dropDownAttributeName, itemValue);
    }


    async clickToRadioButtonByLabel(radioButtonLabelName: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_RADIO_BUTTON_BY_LABEL + radioButtonLabelName);
        await this.checkToDefaultCheckBoxOrRadio(BasePageUI.DYNAMIC_RADIO_BUTTON_BY_LABEL + radioButtonLabelName);
    }

    async clickToCheckboxByLabel(checkboxLabelName: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_CHECKBOX_BY_LABEL + checkboxLabelName);
        await this.checkToDefaultCheckBoxOrRadio(BasePageUI.DYNAMIC_CHECKBOX_BY_LABEL + checkboxLabelName);
    }

    async getTextboxValueByID(textboxID: string) {
        await this.waitForElementVisible(BasePageUI.DYNAMIC_TEXTBOX_BY_ID + textboxID);
        return await this.getElementAttribute(BasePageUI.DYNAMIC_TEXTBOX_BY_ID + textboxID, "value");
    }

    async sleepInSecond(second: number) {
        await this.page.waitForTimeout(second * 1000);
    }

    getRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private longTimeout = 30000; // Assuming LONG_TIMEOUT is in seconds
    private shortTimeout = 5000; // Assuming SHORT_TIMEOUT is in seconds

    static async scrollDown(page: Page) {
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async verifyAllItemsHaveStatus(page: Page, locator: string, statusToCheck: string): Promise<boolean> {
        let allItemsDenied = false;
        const items = await page.$$(locator);
        for (const item of items) {
            const status = await item.innerText();
            if (status !== statusToCheck) {
                break;
            } else {
                allItemsDenied = true;
            }
        }
        return allItemsDenied;
    }

    async verifyAllItemsHaveCorrectType(page: Page, locator: string, typeToCheck: string): Promise<boolean> {
        let allItemsCorrect = false;
        const items = await page.$$(locator);
        for (const item of items) {
            const type = await item.innerText();
            if (type !== typeToCheck) {
                break;
            } else {
                allItemsCorrect = true;
            }
        }
        return allItemsCorrect;
    }

    async clickMultiTimesToElement(page: Page, locator: string, timeToClick: number) {
        for (let i = 0; i < timeToClick; i++) {
            await page.click(locator);
        }
    }

    async isButtonEnabled(page: Page, locator: string): Promise<boolean> {
        const button = await page.$(locator);
        return !(await button.isEnabled());
    }

    async getListElementsText(page: Page, locator: string): Promise<string[]> {
        const elements = await page.$$(locator);
        const result: string[] = [];
        for (const element of elements) {
            const text = await element.innerText();
            result.push(text);
        }
        return result;
    }

    async clickToElementDynamic(locatorType: string, ...dynamicValues: string[]) {
        // @ts-ignore
        const xpath = this.getDynamicXpath(locatorType, dynamicValues); // Generate dynamic XPath
        const element = await this.page.$(xpath);
        if (element) {
            await element.click();
        } else {
            console.error(`Element with XPath '${xpath}' not found`);
        }
    }
}
