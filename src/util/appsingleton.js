/*jshint esnext: true */
/**
 *    Copyright (C) Siyuan Gao - All Rights Reserved
 *    Unauthorized copying of this file, via any medium is strictly prohibited
 *    Proprietary and confidential
 *    Written by Siyuan Gao <siyuangao@gmail.com>, 10/6/15
 */

/**
 * This is the AppSingleton, this is shared across entire app
 *
 * @class AppSingleton
 * @constructor
 */
class AppSingleton {
    constructor() {
        console.error("Do not construct singleton using the constructor!");
        this.sharedInstance = { };
    }
    /**
     * Get current instance from the singleton
     *
     * @method getInstance
     * @return {Object} Returns current singleton instance
     */
    static getInstance() {
        if(!this.sharedInstance) {
            this.sharedInstance = { };
        }
        return this.sharedInstance;
    }
}

export default AppSingleton;
