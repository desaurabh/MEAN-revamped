var mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill('0AJOrWwmRFor_s361VyPgQ'),
    fs = require('fs'),
    jade = require('jade');

function Mailer(async) {
    this.async = typeof async !== 'boolean' ? false : async;
    this.ipPool = "";
    this.sendAt = "";
    this.client = mandrill_client;
}


Mailer.prototype.send = function(message, cb) {
    this.client.messages.send({
        "message": message,
        "async": this.async,
        "ip_pool": this.ipPool,
        "send_at": this.sendAt
    }, cb, cb);
};

Mailer.prototype.Message = function(user, from) {

    function Message(user, from, messageProperties) {
        this.from = typeof from !== 'object' ? {
            from: 'admin@contentolabs.com',
            from_name: 'Contento CDN'
        } : from;
        this.properties = typeof messageProperties === 'undefined' ? new MessageProperties(this.from, user) : messageProperties;
        this.getJSON = function() {
            return JSON.parse(JSON.stringify(this.properties));
        };

    }



    function MessageProperties(from, user) {
        var users = this.buildProps(user);
        this.website = "www.contentolabs.com";
        this.properties = {
            html: null,
            text: null,
            subject: null,
            from_email: from.from,
            from_name: from.from_name,
            to: users.to,
            subaccount: null,
            recipient_metadata: users.recipient_metadata,
            metadata: {
                website: this.website
            },
            attachments: [],
            images: [],
            important: true,
            tags: ['important'],
            track_opens: null,
            track_clicks: null,
            auto_text: null,
            auto_html: null,
            inline_css: null,
            url_strip_qs: null,
            preserve_recipients: null,
            view_content_link: null,
            bcc_address: null,
            tracking_domain: null,
            signing_domain: null,
            return_path_domain: null,
            merge: false,
            merge_language: 'mailchimp',
            global_merge_vars: [{}],
            merge_vars: [{}],
            google_analytics_domains: [],
            google_analytics_campaign: ''

        };
        return this.properties;

    }
    MessageProperties.prototype.buildProps = function(user) {
        //props email, name, type(header)
        var meta = {
            recipient_metadata: [],
            to: []
        };

        if (typeof user !== 'undefined') {
            if (typeof user.length !== 'undefined') {
                for (var i in user) {
                    if (user[i].email !== 'undefined') {
                        meta.recipient_metadata.push({
                            rcpt: user[i].email,
                            values: {
                                user_id: user[i]._id
                            }
                        });
                        meta.to.push({
                            email: user[i].email,
                            name: user[i].fName + " " + user[i].lName,
                            type: 'to'
                        });
                    }
                }
            }
        }
        return meta;
    };

    return new Message(user, from);
};


function MailFactory(type, data) {
    this.templatePath = "client/mail-templates/";
    this.Mailer = new Mailer(data);
    this.type = type;
    this.data = data;
    this.getCompiledTemplate = function(name, data, cb) {
        fs.readFile(this.templatePath + name + ".jade", 'utf-8', function(err, data) {
            if (err) {
                cb(err, false);
            } else {
                var fn = jade.compile(data);
                var html = fn({
                    data: data
                });
                cb(html);
            }
        });
    };
}

MailFactory.prototype.sendMail = function(cb) {
    var mailer = this.Mailer;
    var message = new mailer.Message(this.data);
    message.properties.subject = "Account registration";
    this.getCompiledTemplate(this.type, this.data, function(html, err) {
        if (!html) cb(false, err);
        else {
            console.log(html);
            message.properties.html = html;
            mailer.send(message.properties, function(result) {
                cb(result);
            });
        }
    });

};

module.exports = MailFactory;
