import RPi.GPIO as gpio
from time import sleep

# Configuracion de pines
DIR = 20  # Pin GPIO para la direcciï¿½n
STEP = 21  # Pin GPIO para los pasos
CW = 0  # Clockwise (sentido horario)
SPR = 130000  # Pasos necesarios para avanzar 15 cm (ajusta segun el sistema)

# Configuracion de GPIO
gpio.setmode(gpio.BCM)
gpio.setup(DIR, gpio.OUT)
gpio.setup(STEP, gpio.OUT)
gpio.output(DIR, CW)  # Establecer sentido horario

# Funcionn para mover el motor
def step_motor(steps, step_delay):
    for _ in range(steps):
        gpio.output(STEP, gpio.HIGH)
        sleep(step_delay)
        gpio.output(STEP, gpio.LOW)
        sleep(step_delay)

try:
    print("Avanzando 15 cm en sentido horario")
    step_motor(SPR, 0.00011)  # Ajusta el delay si necesitas cambiar la velocidad
    print("Motor detenido")
    
except KeyboardInterrupt:
    print("Limpieza de GPIO y salida")
    gpio.cleanup()

# Limpieza final de GPIO
gpio.cleanup()
