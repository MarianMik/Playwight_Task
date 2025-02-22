
import { test, expect } from '@playwright/test';
import { loginpage } from '../pages/loginpage'; 

const testCases = [
  {
    navigationTarget: 'Web Application Main web',
    taskName: 'Implement user authentication',
    column: 'To Do',
    tags: ['Feature', 'High Priority'],
  },
  {
    navigationTarget: 'Web Application Main web',
    taskName: 'Fix navigation bug',
    column: 'To Do',
    tags: ['Bug'],
  },
  {
    navigationTarget: 'Web Application Main web',
    taskName: 'Design system updates',
    column: 'In Progress',
    tags: ['Design'],
  },
  {
    navigationTarget: 'Mobile Application Native',
    taskName: 'Push notification system',
    column: 'To Do',
    tags: ['Feature'],
  },
  {
    navigationTarget: 'Mobile Application Native',
    taskName: 'Offline mode',
    column: 'In Progress',
    tags: ['Feature', 'High Priority'],
  },
  {
    navigationTarget: 'Mobile Application Native',
    taskName: 'App icon design',
    column: 'Done',
    tags: ['Design'],
  },
];

test.describe('Test Cases', () => {
    let page;

    test.beforeEach(async ({ page: p }) => {
        page = p;
        const Login = new loginpage(page);
        await Login.gotoLoginPage();
        await Login.login('admin', 'password123');
    });

    testCases.forEach((testCase, index) => {
        test(`Test Case ${index + 1}: Verify ${testCase.taskName}`, async () => {
       
           await page.waitForSelector('button', { name :testCase.navigationTarget} ); 
           await page.getByRole ('button', { name :testCase.navigationTarget} ).click();


            const taskLocator = await page.getByRole('heading', { name: testCase.taskName });
            await expect(taskLocator).toBeVisible();

            for (const tag of testCase.tags) {

                //const tagLocator = taskLocator.locator(`span.tag:has-text("${tag}")`);
                //await expect(tagLocator).toBeVisible();
                await expect(page.getByText(tag).first()).toBeVisible();
            }
        });
    });
});