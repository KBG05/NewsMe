import threading

def loop1():
    for i in range(5):
        print(f"Loop 1 - {i}")

def loop2():
    for i in range(5):
        print(f"Loop 2 - {i}")

def loop3():
    for i in range(5):
        print(f"Loop 3 - {i}")

t1 = threading.Thread(target=loop1)
t2 = threading.Thread(target=loop2)
t3 = threading.Thread(target=loop3)

t1.start()
t2.start()
t3.start()

t1.join()
t2.join()
t3.join()