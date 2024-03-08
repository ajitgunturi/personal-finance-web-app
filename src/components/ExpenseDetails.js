import { useEffect, useState } from "react";
import './ExpenseDetails.css'

function ExpenseDetails(){
  const [userData, setUserData] = useState({});
  const [expenseData, setExpenseData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:9090/users/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Could not fetch user data:", error);
        setUserData({})
      }
    };

    const fetchExpensesData = async () => {
      try {
        const response = await fetch('http://localhost:9090/expenses/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExpenseData(data);
      } catch (error) {
        console.error("Could not fetch user data:", error);
        setExpenseData([])
      }
    };

    fetchUserData();
    fetchExpensesData();
  }, []);

  const handleRowClick = (expense) => {
    setSelectedExpense(expense);
  };

  const handleDelete = (expenseId) => {
    // Implement deletion logic here
    console.log(`Delete expense with ID: ${expenseId}`);
    // After deleting, you might want to fetch the updated expenses list or remove the deleted item from state
  };

  const handleEdit = (expenseId) => {
    // Implement edit logic here
    console.log(`Edit expense with ID: ${expenseId}`);
    // This could involve setting another piece of state to manage the edit form visibility and data
  };

    return(
        <div>
            <div className="expense-header">
              <div key={userData.userId} className="user-card">
                <div className="user-detail">{userData.firstName}'s Expenses</div>
              </div>
            </div>
            <div>
            <table id="expenseTable">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                      {expenseData.map((expense, index) => (
                        <tr key={index}  onClick={() => handleRowClick(expense)}>
                          <td>{expense.category}</td>
                          <td style={{ color: parseInt(expense.amount) > 0 ? 'green' : 'red' , alignContent: 'end'}}>
                            
                          <i class="fa fa-inr"></i> {expense.amount}</td>
                          <td>{expense.description}</td>
                          {selectedExpense && selectedExpense === expense && (
                            <td>
                              <button onClick={() => handleEdit(expense.id)}>Edit</button>
                              <button onClick={() => handleDelete(expense.id)}>Delete</button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ExpenseDetails;