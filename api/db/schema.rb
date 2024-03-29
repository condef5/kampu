# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_15_215722) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bookings", force: :cascade do |t|
    t.date "date"
    t.integer "start_hour"
    t.integer "end_hour"
    t.integer "amount"
    t.bigint "sport_field_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sport_field_id"], name: "index_bookings_on_sport_field_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "clubs", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.json "schedule"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "district"
    t.string "latitude"
    t.string "longitude"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "club_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_favorites_on_club_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "sport_fields", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "price_day"
    t.integer "price_night"
    t.bigint "club_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_sport_fields_on_club_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "token"
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_users_on_token"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bookings", "sport_fields"
  add_foreign_key "bookings", "users"
  add_foreign_key "favorites", "clubs"
  add_foreign_key "favorites", "users"
  add_foreign_key "sport_fields", "clubs"
end
