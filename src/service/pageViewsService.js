// pageViewsService.js

class PageViewsService {
  constructor(pageViewsModel) {
    this.pageViewsModel = pageViewsModel;
  }

  async addPageView(pageIds, visitorId, viewTime) {
    try {
      const pageView = await this.pageViewsModel.create({
        page_ids: pageIds,
        visitor_id: visitorId,
        view_time: viewTime,
      });
      return pageView;
    } catch (error) {
      throw new Error(`Failed to add page view: ${error.message}`);
    }
  }

  async getPageViewsByPageId(pageId) {
    try {
      const pageViews = await this.pageViewsModel.findAll({
        where: { page_ids: pageId },
      });
      return pageViews;
    } catch (error) {
      throw new Error(`Failed to get page views by page id: ${error.message}`);
    }
  }

  async getPageViewsByVisitorId(visitorId) {
    try {
      const pageViews = await this.pageViewsModel.findAll({
        where: { visitor_id: visitorId },
      });
      return pageViews;
    } catch (error) {
      throw new Error(
        `Failed to get page views by visitor id: ${error.message}`
      );
    }
  }

  async getPageViewsByViewTime(startTime, endTime) {
    try {
      const pageViews = await this.pageViewsModel.findAll({
        where: {
          view_time: {
            [Op.between]: [startTime, endTime],
          },
        },
      });
      return pageViews;
    } catch (error) {
      throw new Error(
        `Failed to get page views by view time: ${error.message}`
      );
    }
  }
}

module.exports = PageViewsService;
