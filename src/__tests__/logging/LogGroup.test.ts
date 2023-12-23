import { LogGroup } from "../../js/engine/logging/LogGroup"

let logGroup = new LogGroup("test_log_group")

beforeEach(() => {
    logGroup = new LogGroup("test_log_group")
})


describe("log group", () => {
    test("logs normally", () => {
        expect(logGroup.log("test string")).toEqual("[TEST_LOG_GROUP] test string");
    })
    describe("logging with pause", () => {
        test("does not log within the same second", () => {
            const firstLog = logGroup.logWithPause("firstLog", 20);
            const secondLog = logGroup.logWithPause("secondLog", 20);
            expect(firstLog).toEqual("[TEST_LOG_GROUP] firstLog");
            expect(secondLog).toBe(null);
        })
        test("logs after given time passes", async () => {
            const firstLog = logGroup.logWithPause("firstLog", 0.01);
            await new Promise(r => setTimeout(r, 0.01 * 1000));
            const secondLog = logGroup.logWithPause("secondLog", 0.01);

            expect(firstLog).toEqual("[TEST_LOG_GROUP] firstLog");
            expect(secondLog).toEqual("[TEST_LOG_GROUP] secondLog");

        })
    })
})