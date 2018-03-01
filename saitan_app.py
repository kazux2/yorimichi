import googlemaps
from datetime import datetime
from flask import Flask, render_template, request
from send_email import send_email
from settings import SETTING
import cgi

app = Flask(__name__)

gmaps = googlemaps.Client(key=SETTING['gmap_key'])



@app.route("/")
def index():
    return render_template("index.html")



@app.route("/mail", methods=['post'])
def mail():
    if request.method == 'POST':

        email=request.form["email"]
        start=request.form["start"] #htmlフォームから入力データを取得
        wp1=request.form["wp1"]
        wp2=request.form["wp2"]
        wp3=request.form["wp3"]
        wp4=request.form["wp4"]
        wp5=request.form["wp5"]
        goal = request.form["goal"]

        wp_list = [wp1,wp2,wp3,wp4,wp5]
        wp_order = gmaps.directions(start, goal, "walking", wp_list, optimize_waypoints=True)[0]['waypoint_order'] #順番(数字)の配列

        #リスト並べ替え
        # wp_order = [0,1,2,3,4] #仮
        reorder_wp = []
        for i in wp_order:
            reorder_wp.append(wp_list[i])

        kekka = "→".join(reorder_wp)
        hyouzi = start+ "→" + kekka + "→" + goal

        #メール送信
        send_email(email,start,reorder_wp[0],reorder_wp[1],reorder_wp[2],reorder_wp[3],reorder_wp[4],goal)



        return render_template("mail.html",text=hyouzi)

if __name__ == '__main__':
    app.debug=False #ウェブで公開する時はFalseにする
    app.run() #カッコ内にport番号を指定してもいい
