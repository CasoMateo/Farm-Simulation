class Solution:
    def finalValueAfterOperations(self, operations: List[str]) -> int:
      
      accum = 0 
      
      mem = {'X++': 1, '++X': 1, 'X--': -1, '--X': -1}
      
      for i in range(len(operations)):
        accum += mem[operations[i]]
      
      return accum
        
