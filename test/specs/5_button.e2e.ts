import { expect, browser, $ } from '@wdio/globals'

describe('Open Google with Brave', async () => {
    it('should load Google homepage and stay open', async () => {
        await browser.url('https://showdownspace-rpa-challenge.vercel.app/challenge-buttons-a9808c5e/');
        await $('//*[@id="root"]/div/div[1]/button').click();

        while (!await $('//*[text()="Challenge completed!"]').isExisting()) {
            try {
                // ดึงข้อความโจทย์
                const text = await $('//*[@id="root"]/div/div/div[2]/div/div/div[2]/p').getText();
                if (!text) return
                const resultStr = text.replaceAll('÷', '/').replaceAll('×', '*').replaceAll(',', '').replaceAll(' = ?', '');

                // คำนวณค่าผลลัพธ์
                const result = await browser.execute((expression) => {
                    return new Function('return ' + expression)();
                }, resultStr);

                // พิมพ์ตัวเลขลงปุ่ม
                const digits = result.toString().split('');
                for (const digit of digits) {
                    await $(`//button[text()="${digit}"]`).click();
                }

                // คลิกปุ่ม "Next"
                const nextButton = await $('//*[@id="root"]/div/div/div[2]/div/div/div[3]/div[12]/button');
                await nextButton.click();

   

            } catch (err) {
                console.error("เกิดข้อผิดพลาด: ", err);
                break;  // ออกจากลูปถ้าผิดพลาด
            }
        }
    });
});