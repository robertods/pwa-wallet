export async function getCategories() {

  const res1 = await fetch('/api/expenses-categories')
  const expenses = await res1.json()

  const res2 = await fetch('/api/income-categories')
  const income = await res2.json()

  return { expenses, income }
}
