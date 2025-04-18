import { expect, browser, $ } from '@wdio/globals'

describe('1_hutting', async () => {
    it('*', async () => {
        await browser.url('https://showdownspace-rpa-challenge.vercel.app/challenge-hunting-fed83d58/');
        await $('//*[@id="root"]/div/div[1]/button').click();
        
        // Get target numbers
        const texts = await $('.css-1bfe2ax').getText();
        const targetNumbers = texts.split('\n');

        const boxes = await $$('img');

        for (let box of boxes) {
            await box.moveTo();

            const hoveredText = await browser.execute(() => {
                const bodyChildren = document.body.children;
                const lastDiv = bodyChildren[bodyChildren.length - 1];
                return lastDiv?.textContent?.trim() || '';
            });

            if (targetNumbers.includes(hoveredText)) {
                await box.click();
            }

            const isCompleted = await $('//*[text()="Challenge completed!"]').isExisting();
            if (isCompleted) {
                break;
            }

        }
    });
});