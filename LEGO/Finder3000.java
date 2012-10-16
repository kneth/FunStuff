import lejos.nxt.Button;
import lejos.nxt.LCD;
import lejos.nxt.Motor;
import lejos.nxt.SensorPort;
import lejos.nxt.UltrasonicSensor;
import lejos.nxt.ColorSensor;
import lejos.robotics.RegulatedMotor;
import lejos.robotics.Color
import lejos.robotics.subsumption.Arbitrator;
import lejos.robotics.subsumption.Behavior;

public class Finder3000 {
    static RegulatedMotor rightMotor = Motor.A;
    static RegulatedMotor leftMotor  = Motor.C;
    static Arbitrator arbitrator;
    public static void main(String[] argv) {
        LCD.drawString("Hej Alt om Data", 0, 1);
        Button.waitForAnyPress();

        leftMotor.setSpeed(400);
        rightMotor.setSpeed(400);

        Behavior b1 = new DriveForward();
        Behavior b2 = new DetectWall();
        Behavior b3 = new DetectBrick();
        Behavior[] behaviorList = { b1, b2, b3 };
        arbitrator = new Arbitrator(behaviorList);
        arbitrator.start();
    }
}


class DriveForward implements Behavior {
    private boolean _suppressed = false;
    
    public boolean takeControl() {
        return true;
    }

    public void suppress() {
        _suppressed = true;
    }

    public void action() {
        _suppressed = false;
        Finder3000.leftMotor.forward();
        Finder3000.rightMotor.forward();
        while (!_suppressed) {
            Thread.yield();
        }
        Finder3000.leftMotor.stop(); 
        Finder3000.rightMotor.stop();
    }
}

class DetectWall implements Behavior {
    private UltrasonicSensor sonar;

    public DetectWall() {
        sonar = new UltrasonicSensor(SensorPort.S1);
    }
   
    public boolean takeControl() {
        sonar.ping();
        return sonar.getDistance() < 25;
    }

    public void suppress() { }
    
    public void action() {
        LCD.drawString("Wall detected", 0, 1);
        Finder3000.leftMotor.rotate(-180, true);
        Finder3000.rightMotor.rotate(-360);
    }
}


class DetectBrick implements Behavior {
    private ColorSensor color;

    public DetectBrick() {
        color = new ColorSensor(SensorPort.S4);
    }

    public boolean takeControl() {
        return color.getColorID() == Color.BLUE;
    }

    public void suppress() { };

    public void action() {
        LCD.drawString("Blue brick detected", 0, 1);
        Finder3000.leftMotor.stop();
        Finder3000.rightMotor.stop();
    }
}
