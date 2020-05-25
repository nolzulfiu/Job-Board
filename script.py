import os
import threading

# Define a function for the thread
def print_time( threadName):
    if threadName == 'redis':
        os.system("redis-server")
    elif threadName == 'api':
        os.system("node api/index.js")
    elif threadName == 'worker':
        os.system("node worker/index.js")
    elif threadName == 'client':
        os.system("cd client & cd src & npm start")

# Create two threads as follows
if __name__ == "__main__": 
    t1 = threading.Thread(target=print_time, args=('redis',)) 
    t2 = threading.Thread(target=print_time, args=('api',)) 
    t3 = threading.Thread(target=print_time, args=('worker',))
    t4 = threading.Thread(target=print_time, args=('client',))

    t1.start() 
    # starting thread 2 
    t2.start() 

    t3.start()

    t4.start()
  
    # wait until thread 1 is completely executed 
    t1.join() 
    # wait until thread 2 is completely executed 
    t2.join() 

    t3.join()

    t4.join()
  
    # both threads completely executed 
    print("Done!") 

# os.system("redis-server")

# os.system("start cmd /c & cd client & npm start")

# os.system("start cmd /c node api/index.js")