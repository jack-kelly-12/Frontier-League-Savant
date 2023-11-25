import os

import pandas as pd
from flask import Flask, render_template, send_from_directory, jsonify

app = Flask(__name__)
stuff_df = pd.read_csv('csvs/stuff+.csv')
location_df = pd.read_csv('csvs/location+.csv')
xstats_df = pd.read_csv('csvs/leaderboard_savant.csv')
umpire_leaderboard_df = pd.read_csv('csvs/umpireLeaderboard.csv')
catcher_leaderboard_df = pd.read_csv('csvs/catcherLeaderboard.csv')
disc_df = pd.read_csv('csvs/disc_data.csv')
spray_df = pd.read_csv('csvs/spray_data.csv')

pitcher_folder = os.path.join(app.static_folder, 'Usages')
catcher_folder = os.path.join(app.static_folder, 'CatcherReports')
pitchers = [f[:-4] for f in os.listdir(pitcher_folder) if f.endswith('.png')]
catchers = [f[:-4] for f in os.listdir(catcher_folder) if f.endswith('.png')]


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/umpire')
def umpire():
    return render_template('umpire.html', umpire_leaderboard_df=umpire_leaderboard_df.to_dict('records'))


@app.route('/umpires')
def umpires():
    umpire_report_dir = os.path.join(app.static_folder, 'UmpireReports')
    umpires = os.listdir(umpire_report_dir)
    return jsonify({'umpires': umpires})


@app.route('/UmpireReports/<umpire>/<filename>')
def umpire_report_image(umpire, filename):
    return send_from_directory(os.path.join(app.static_folder, 'UmpireReports', umpire), filename)


@app.route('/stuff')
def stuff():
    pd.options.display.float_format = '{:,.0f}'.format
    return render_template('stuff.html', stuff_data=stuff_df.to_dict('records'),
                           location_data=location_df.to_dict('records'))


@app.route('/hitter')
def xstats():
    return render_template('hitters.html', disc_df=disc_df.to_dict('records'), spray_df=spray_df.to_dict('records'),
                           xstats_df=xstats_df.to_dict('records'))


@app.route('/catcher')
def catcher():
    return render_template('catcher.html', catchers=catchers,
                           catcher_leaderboard_df=catcher_leaderboard_df.to_dict('records'))


if __name__ == '__main__':
    app.run()
