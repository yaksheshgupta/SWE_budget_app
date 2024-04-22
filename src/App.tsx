import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from 'shared/hoc/layout/component/layout';
import CreateExpenseContainer from 'feature/createExpense/container/createExpenseContainer';
import 'assets/styles/index.scss';
import SummaryContainer from 'feature/summary/container/summaryContainer';
import EscrowTransactions from 'feature/createEscrow/component/createEscrow';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path='*' element={<Navigate replace to='/homePage' />} />
					<Route path='/createExpense' element={<CreateExpenseContainer />} />
					<Route path='/homePage' element={<SummaryContainer />} />
					<Route path='/es' element={<EscrowTransactions />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
