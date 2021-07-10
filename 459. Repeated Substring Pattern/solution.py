class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
      
      if len(s) < 2: 
        return False
      
      for i in range(len(s) // 2):
        cur = s[: i + 1]
        
        if cur * (len(s) // len(cur)) == s: 
          return True 
        
      return False
          
