import { useEffect, useState } from "react";
import './ExpenseDetails.css'
import axios from "axios";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

function ExpenseDetails(){
  const [userData, setUserData] = useState({});
  const [expenseData, setExpenseData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editFormData, setEditFormData] = useState({ category: '', amount: '', description: '' });


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

  const handleDelete = async (expense) => {
    console.log(`Delete expense with ID: ${expense.expenseId}`);
    try{
      await axios.delete('http://localhost:9090/expenses/'+expense.expenseId)
      setExpenseData(expenseData => expenseData.filter(exp => exp.expenseId!==expense.expenseId));
    }catch(error){
      console.error('Could not delete the expense:', error)
    }
  };

  const handleEdit = (expense) => {
    console.log(`Edit expense with ID: ${expense.expenseId}`);
    setEditFormData(expense);
    onOpen();
  };

  const handleSubmitEditForm = async (e) => {
    e.preventDefault();
    onClose()
    try {
      const response = await fetch(`http://localhost:9090/expenses/${editFormData.expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedExpense = await response.json();
      console.log('Updated expense:', updatedExpense.expenseId);
      
    } catch (error) {
      console.error("Could not update the expense:", error);
    }
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
                            
                          <i className="fa fa-inr"></i> {expense.amount}</td>
                          <td>{expense.description}</td>
                          {selectedExpense && selectedExpense === expense && (
                            <td>
                              <button onClick={() => handleEdit(expense)}>Edit</button>
                              <button onClick={() => handleDelete(expense)}>Delete</button>
                            </td>
                          )}  
                        </tr>
                      ))}
                    </tbody>
                </table>
                
                  <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay bg="blackAlpha.300"/>
                    <ModalContent
                    sx={{
                      maxW: '32rem',
                      bg: 'gray.50',
                      color: 'black'
                    
                    }}
                    >
                      <ModalHeader>Edit Expense</ModalHeader>
                      <ModalCloseButton />
                      <form onSubmit={handleSubmitEditForm}>
                        <ModalBody>
                          <Input
                            placeholder="Category"
                            mb={3}
                            value={editFormData.category}
                            onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}
                          />
                          <Input
                            placeholder="Amount"
                            mb={3}
                            type="number"
                            value={editFormData.amount}
                            onChange={e => setEditFormData({ ...editFormData, amount: e.target.value })}
                          />
                          <Input
                            placeholder="Description"
                            mb={3}
                            value={editFormData.description}
                            onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button type="submit">Save</Button>
                        </ModalFooter>
                      </form>
                    </ModalContent>
                  </Modal>
            </div>
        </div>
    )

}

export default ExpenseDetails;