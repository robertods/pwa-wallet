export async function getCategories() {

  const res1 = await fetch('/balance-categories')
  const balance = await res1.json()

  const res2 = await fetch('/income-categories')
  const income = await res2.json()

  return { balance, income }
}
