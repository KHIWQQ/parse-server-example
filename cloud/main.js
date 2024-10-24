Parse.Cloud.define('createPortfolio', async (request) => {
    const { name } = request.params;

    const Portfolio = Parse.Object.extend('Portfolio');
    const portfolio = new Portfolio();

    // Optional user check
    if (request.user) {
        portfolio.set('userId', request.user.id);
    } else {
        // Handle case when there's no user, can assign an anonymous user
        portfolio.set('userId', 'anonymous');
    }

    portfolio.set('name', name);

    try {
        const result = await portfolio.save(null, { useMasterKey: true });
        return result;
    } catch (error) {
        throw new Parse.Error(400, error.message);
    }
});

Parse.Cloud.define('addAssetToPortfolio', async (request) => {
    const { portfolioId, symbol, name, amount, price, volume } = request.params;

    const Portfolio = Parse.Object.extend('Portfolio');
    const portfolioQuery = new Parse.Query(Portfolio);

    try {
        const portfolio = await portfolioQuery.get(portfolioId, { useMasterKey: true });

        const Asset = Parse.Object.extend('Asset');
        const asset = new Asset();

        asset.set('portfolio', portfolio);
        asset.set('symbol', symbol);
        asset.set('name', name);
        asset.set('amount', amount);
        asset.set('price', price);
        asset.set('volume', volume);
        asset.set('date', new Date());

        const result = await asset.save(null, { useMasterKey: true });
        return result;
    } catch (error) {
        throw new Parse.Error(400, error.message);
    }
});

Parse.Cloud.define('getPortfolioAssets', async (request) => {
    const { portfolioId } = request.params;

    const Portfolio = Parse.Object.extend('Portfolio');
    const portfolioQuery = new Parse.Query(Portfolio);

    const Asset = Parse.Object.extend('Asset');
    const assetQuery = new Parse.Query(Asset);

    try {
        const portfolio = await portfolioQuery.get(portfolioId, { useMasterKey: true });
        assetQuery.equalTo('portfolio', portfolio);

        const assets = await assetQuery.find({ useMasterKey: true });
        return assets;
    } catch (error) {
        throw new Parse.Error(400, error.message);
    }
});

Parse.Cloud.define('updateAsset', async (request) => {
    const { assetId, price, volume } = request.params;

    const Asset = Parse.Object.extend('Asset');
    const query = new Parse.Query(Asset);

    try {
        const asset = await query.get(assetId, { useMasterKey: true });

        if (price) asset.set('price', price);
        if (volume) asset.set('volume', volume);

        const result = await asset.save(null, { useMasterKey: true });
        return result;
    } catch (error) {
        throw new Parse.Error(400, error.message);
    }
});

Parse.Cloud.define('deleteAsset', async (request) => {
    const { assetId } = request.params;

    const Asset = Parse.Object.extend('Asset');
    const query = new Parse.Query(Asset);

    try {
        const asset = await query.get(assetId, { useMasterKey: true });
        await asset.destroy({ useMasterKey: true });
        return { message: 'Asset deleted successfully' };
    } catch (error) {
        throw new Parse.Error(400, error.message);
    }
});
