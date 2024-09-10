export class apiFilter {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i'
                  }
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filters() {
        const queryCopy = { ...this.queryStr };

        const fieldsToRemove = ['keyword', 'page', 'sortBy'];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = parseInt(this.queryStr.page) || 1;
        const skip = (currentPage - 1) * resPerPage;
        this.query = this.query.limit(resPerPage).skip(skip);

        return this;
    }

    sort() {
        const sortBy = this.queryStr.sortBy;
        this.query = this.query.sort(sortBy);
        return this;
    }
}
