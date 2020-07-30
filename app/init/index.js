const chalk = require('chalk');

const CBMB = require('./CBMB');
const City = require('./City');
const Color = require('./Color');
const Country = require('./Country');
const Currency = require('./Currency');
const Drive = require('./Drive');
const EngineVolumeLiters = require('./EngineVolumeLiters');
const Fuel = require('./Fuel');
const Gearbox = require('./Gearbox');
const PowerType = require('./PowerType');
const Region = require('./Region');
const Status = require('./Status');
const TechnicalCondition = require('./TechnicalCondition');

(async () => {
    try {
        await CBMB();
        await City();
        await Color();
        await Country();
        await Currency();
        await Drive();
        await EngineVolumeLiters();
        await Fuel();
        await Gearbox();
        await PowerType();
        await Region();
        await Status();
        await TechnicalCondition();

        console.log(chalk.green('Init has finished'));
        process.exit();

    } catch (e) {
        console.log(chalk.bold.red('Error'), e);
    }
})();
