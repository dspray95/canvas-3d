import { LogGroup } from "../../../js/engine/logging/LogGroup"
import { Logger } from "../../../js/engine/logging/logger"

beforeEach(() => {
    Logger._logger = null;
})

const logger = Logger.logger;

describe("logger", () => {
    test("does not create new log group when using default", () => {
        const defaultLogGroupCreatedAt = logger.logGroups[0].createdAt;
        logger.log("test string");
        expect(logger.logGroups[0].createdAt).toEqual(defaultLogGroupCreatedAt);
        expect(logger.logGroups.length).toEqual(1);
    })
})