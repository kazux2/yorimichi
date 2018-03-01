from email.mime.text import MIMEText
import smtplib
from settings import SETTING

def send_email(email,start,wp1,wp2,wp3,wp4,wp5,goal):
    from_email=SETTING['from_email']
    from_password=SETTING['from_password']
    to_email=email

    subject="よりみち順路まっぷ"
    message="以下の順路が最短です。<br><br>スタート:%s<br>1.%s<br>2.%s<br>3.%s<br>4.%s<br>5.%s<br>ゴール:%s<br>" % (start, wp1,wp2,wp3,wp4,wp5,goal)

    msg=MIMEText(message, 'html')
    msg['Subject']=subject
    msg['To']=to_email
    msg['From']=from_email

    gmail=smtplib.SMTP('smtp.gmail.com',587)
    gmail.ehlo()
    gmail.starttls()
    gmail.login(from_email, from_password)
    gmail.send_message(msg)


