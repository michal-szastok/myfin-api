import express from 'express';
import UserController from '../controllers/userController.js';
import AccountController from '../controllers/accountController.js';
import TransactionController from '../controllers/transactionController.js';
import EntityController from '../controllers/entityController.js';
import RuleController from '../controllers/ruleController.js';
import CategoryController from '../controllers/categoryController.js';
import BudgetController from '../controllers/budgetController.js';
import StatsController from '../controllers/statsController.js';
import InvestAssetsController from '../controllers/investAssetsController.js';
import InvestTransactionsController from '../controllers/investTransactionsController.js';
import { Express } from 'express-serve-static-core';

const router = (app: Express) => {
  // USERS ROUTES
  const userRouter = express.Router();
  userRouter.get('/categoriesAndEntities', UserController.getUserCategoriesAndEntities);

  const usersRouter = express.Router();
  usersRouter.post('/', UserController.createOne);
  usersRouter.put('/changePW/', UserController.changeUserPassword);
  usersRouter.post('/demo/', UserController.autoPopulateDemoData);

  // AUTH ROUTES
  const authRoutes = express.Router();
  authRoutes.post('/', UserController.attemptLogin);

  const validityRoutes = express.Router();
  validityRoutes.post('/', UserController.checkSessionValidity);

  // ACCOUNTS ROUTES
  const accountsRoutes = express.Router();
  accountsRoutes.post('/', AccountController.createAccount);
  accountsRoutes.get('/', AccountController.getAllAccountsForUser);
  accountsRoutes.delete('/', AccountController.deleteAccount);
  accountsRoutes.put('/', AccountController.updateAccount);
  accountsRoutes.get('/stats/balance-snapshots/', AccountController.getUserAccountsBalanceSnapshot);
  accountsRoutes.get(
    '/recalculate-balance/all',
    AccountController.recalculateAllUserAccountsBalances
  );

  // BUDGETS ROUTES
  const budgetRoutes = express.Router();
  budgetRoutes.get('/', BudgetController.getAllBudgetsForUser);
  budgetRoutes.get('/filteredByPage/:page', BudgetController.getFilteredBudgetsForUserByPage);
  budgetRoutes.post('/step0', BudgetController.addBudgetStep0);
  budgetRoutes.post('/step1', BudgetController.createBudget);
  budgetRoutes.get('/:id', BudgetController.getBudget);
  budgetRoutes.put('/', BudgetController.updateBudget);
  budgetRoutes.put('/status', BudgetController.changeBudgetStatus);
  budgetRoutes.delete('/', BudgetController.removeBudget);
  budgetRoutes.get('/list/summary', BudgetController.getBudgetsListForUser);
  budgetRoutes.put('/:id', BudgetController.updateBudgetCategoryPlannedValues);

  // CATEGORIES ROUTES
  const catRoutes = express.Router();
  catRoutes.get('/', CategoryController.getAllCategoriesForUser);
  catRoutes.post('/', CategoryController.createCategory);
  catRoutes.delete('/', CategoryController.deleteCategory);
  catRoutes.put('/', CategoryController.updateCategory);

  // ENTITIES ROUTES
  const entityRoutes = express.Router();
  entityRoutes.get('/', EntityController.getAllEntitiesForUser);
  entityRoutes.post('/', EntityController.createEntity);
  entityRoutes.delete('/', EntityController.deleteEntity);
  entityRoutes.put('/', EntityController.updateEntity);

  // RULES ROUTES
  const ruleRoutes = express.Router();
  ruleRoutes.get('/', RuleController.getAllRulesForUser);
  ruleRoutes.post('/', RuleController.createRule);
  ruleRoutes.delete('/', RuleController.deleteRule);
  ruleRoutes.put('/', RuleController.updateRule);

  // STATS ROUTES
  const statRoutes = express.Router();
  statRoutes.get(
    '/dashboard/month-expenses-income-distribution',
    StatsController.getExpensesIncomeDistributionForMonth
  );
  statRoutes.get(
    '/stats/monthly-patrimony-projections',
    StatsController.getMonthlyPatrimonyProjections
  );
  statRoutes.get('/userStats', StatsController.getUserCounterStats);
  statRoutes.get(
    '/category-expenses-evolution',
    StatsController.getCategoryEntityExpensesEvolution
  );
  statRoutes.get('/category-income-evolution', StatsController.getCategoryEntityIncomeEvolution);
  statRoutes.get(
    '/year-by-year-income-expense-distribution',
    StatsController.getYearByYearIncomeExpenseDistribution
  );

  // TRANSACTIONS ROUTES
  const trxRoutes = express.Router();
  trxRoutes.get('/', TransactionController.getTransactionsForUser);
  trxRoutes.get('/filteredByPage/:page', TransactionController.getFilteredTrxByPage);
  trxRoutes.post('/step0', TransactionController.createTransactionStep0);
  trxRoutes.post('/step1', TransactionController.createTransaction);
  trxRoutes.delete('/', TransactionController.deleteTransaction);
  trxRoutes.put('/', TransactionController.updateTransaction);
  trxRoutes.get(
    '/inMonthAndCategory',
    TransactionController.getAllTransactionsForUserInCategoryAndInMonth
  );
  trxRoutes.post('/auto-cat-trx', TransactionController.autoCategorizeTransaction);
  trxRoutes.post('/import/step0', TransactionController.importTransactionsStep0);
  trxRoutes.post('/import/step1', TransactionController.importTransactionsStep1);
  trxRoutes.post('/import/step2', TransactionController.importTransactionsStep2);

  // INVEST ASSET ROUTES
  const investAssetRoutes = express.Router();
  investAssetRoutes.get('/', InvestAssetsController.getAllAssetsForUser);
  investAssetRoutes.post('/', InvestAssetsController.createAsset);
  investAssetRoutes.delete('/:id', InvestAssetsController.deleteAsset);
  investAssetRoutes.put('/:id', InvestAssetsController.updateAsset);
  investAssetRoutes.put('/:id/value', InvestAssetsController.updateCurrentAssetValue);
  investAssetRoutes.get('/summary', InvestAssetsController.getAllAssetsSummaryForUser);
  investAssetRoutes.get('/stats', InvestAssetsController.getAssetStatsForUser);
  investAssetRoutes.get('/:id', InvestAssetsController.getAssetDetailsForUser);

  // INVEST TRANSACTION ROUTES
  const investTrxRoutes = express.Router();
  investTrxRoutes.get('/', InvestTransactionsController.getAllTransactionsForUser);
  investTrxRoutes.post('/', InvestTransactionsController.createTransaction);
  investTrxRoutes.delete('/:id', InvestTransactionsController.deleteTransaction);
  investTrxRoutes.put('/:id', InvestTransactionsController.updateTransaction);

  app.use('/users', usersRouter);
  app.use('/user', userRouter);
  app.use('/auth', authRoutes);
  app.use('/validity', validityRoutes);
  app.use('/accounts', accountsRoutes);
  app.use('/trxs', trxRoutes);
  app.use('/budgets', budgetRoutes);
  app.use('/cats', catRoutes);
  app.use('/entities', entityRoutes);
  app.use('/rules', ruleRoutes);
  app.use('/stats', statRoutes);
  app.use('/invest/assets', investAssetRoutes);
  app.use('/invest/trx', investTrxRoutes);
};

export default router;
