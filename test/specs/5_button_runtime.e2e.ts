import { expect, browser, $ } from '@wdio/globals'

describe('5_buuton_runtime', async () => {
    it('*', async () => {
        await browser.url('https://showdownspace-rpa-challenge.vercel.app/challenge-buttons-a9808c5e/');
        await $('//*[@id="root"]/div/div[1]/button').click();

        while (!await $('//*[text()="Challenge completed!"]').isExisting()) {
            try {
                // ดึงข้อความโจทย์
                const text = await $('//*[@id="root"]/div/div/div[2]/div/div/div[2]/p').getText();
                if (!text) return

                text.replaceAll('÷', '/').replaceAll('×', '*').replaceAll(',', '').replaceAll(' = ?', '');

                await browser.execute(
                    `window.ans = ${text
                        .replaceAll('÷', '/')
                        .replaceAll('×', '*')
                        .replaceAll(',', '')
                        .replaceAll(' = ?', '')}; 
                    console.log('${text}', window.ans)`
                );

                await browser.execute(() => {
                    const ans = (window as any).ans as number
                    if (!ans) {
                        console.log('not found')
                        return
                    }
                    const ansArr = ans.toString().split('');
                    ansArr.forEach((digit) => {
                        const dom = document.evaluate(
                            `//button[text()="${digit}"]`,
                            document,
                            null,
                            XPathResult.ANY_TYPE,
                            null,
                        ).iterateNext() as HTMLElement | null;

                        if (dom) {
                            dom.click();
                        } else {
                            console.warn(`ไม่พบปุ่มสำหรับ "${digit}"`);
                        }
                    })
                })

                // คลิกปุ่ม "Next"
                await $('//*[@id="root"]/div/div/div[2]/div/div/div[3]/div[12]/button').click();




            } catch (err) {
                console.error("เกิดข้อผิดพลาด: ", err);
                break;
            }
        }
    });
});