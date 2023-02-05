/**
 * @typedef {Object} SessionRepositoryConfig
 * @property {string} url - saving data along the way
 */

class SessionRepository {
    /**
     * @param {SessionRepositoryConfig} config
     */
    constructor(config) {
        this.url = config.url;
    }

    async update(data) {
        await fetch(this.url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
}
